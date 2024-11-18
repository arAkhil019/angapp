import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import db from './data.service';
import storage from './image.service';
import {
    collection,
    query,
    getDoc,
    getDocs,
    doc,
    limit,
    orderBy,
    startAfter,
    QuerySnapshot,
} from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import { BehaviorSubject, Observable, from, throwError, of } from 'rxjs';
import {
    catchError,
    timeout,
    retry,
    map,
    take,
    switchMap,
} from 'rxjs/operators';
import { Employee } from '../models/common.model';

@Injectable({
    providedIn: 'root',
})
export class ViewService {
    private employeesSubject = new BehaviorSubject<Employee[]>([]);
    private lastDoc: any = null;
    private readonly pageSize = 20;
    private readonly TIMEOUT_DURATION = 5000; // 5 seconds
    private readonly MAX_RETRIES = 3;
    private loading = false;
    private isBrowser: boolean;

    constructor(@Inject(PLATFORM_ID) platformId: Object) {
        this.isBrowser = isPlatformBrowser(platformId);
    }

    getEmployeesData<T>(
        collectionName: string,
        sortField: string = 'Time',
        sortDirection: 'asc' | 'desc' = 'desc'
    ): Observable<T[]> {
        //returning empty for SSR
        if (!this.isBrowser) {
            return of([]);
        }
        const collectionRef = collection(db, collectionName);
        const collectionQuery = query(
            collectionRef,
            orderBy(sortField, sortDirection),
            limit(this.pageSize)
        );

        return from(getDocs(collectionQuery)).pipe(
            take(1), // take only one value emission
            timeout(this.TIMEOUT_DURATION),
            retry(this.MAX_RETRIES),
            switchMap(async (querySnapshot) => {
                const docs = querySnapshot.docs;
                this.lastDoc = docs[docs.length - 1];
                // Process each document and fetch image URLs
                const processedDocs = await Promise.all(
                    docs.map(async (doc) => {
                        const data = doc.data();
                        let imageUrl = 'assets/default-profile.png'; // Default image path

                        if (
                            data['Proof'] &&
                            typeof data['Proof'] === 'string'
                        ) {
                            try {
                                const storageRef = ref(
                                    storage,
                                    `proofs/${data['Proof']}`
                                );
                                imageUrl = await getDownloadURL(storageRef);
                            } catch (error) {
                                console.error(
                                    'Error fetching image URL:',
                                    error
                                );
                            }
                        }

                        return {
                            ...data,
                            firebaseId: doc.id,
                            imageUrl: imageUrl,
                        };
                    })
                );

                return processedDocs as T[];
            }),
            catchError((error) => {
                console.error('Firestore error:', error);
                return throwError(
                    () =>
                        new Error(
                            'Failed to fetch data after multiple attempts'
                        )
                );
            })
        );
    }

    loadMoreEmployees(): Observable<Employee[]> {
        if (!this.isBrowser || !this.lastDoc || this.loading) {
            return of([]);
        }

        this.loading = true;
        const employeesRef = collection(db, 'employees');
        const q = query(
            employeesRef,
            orderBy('Name'),
            startAfter(this.lastDoc),
            limit(this.pageSize)
        );

        return from(getDocs(q)).pipe(
            take(1),
            timeout(this.TIMEOUT_DURATION),
            switchMap(async (querySnapshot) => {
                if (querySnapshot.docs.length > 0) {
                    this.lastDoc =
                        querySnapshot.docs[querySnapshot.docs.length - 1];
                }

                const processedDocs = await Promise.all(
                    querySnapshot.docs.map(async (doc) => {
                        const data = doc.data() as Employee;
                        let imageUrl = 'assets/default-profile.png';

                        if (data.Proof && typeof data.Proof === 'string') {
                            try {
                                const storageRef = ref(
                                    storage,
                                    `proofs/${data.Proof}`
                                );
                                imageUrl = await getDownloadURL(storageRef);
                            } catch (error) {
                                console.error(
                                    'Error fetching image URL:',
                                    error
                                );
                            }
                        }

                        return {
                            ...data,
                            imageUrl: imageUrl,
                        };
                    })
                );

                this.loading = false;
                return processedDocs;
            }),
            catchError((error) => {
                this.loading = false;
                return of([]);
            })
        );
    }

    getEmpImage(imagePath: string): Observable<string> {
        if (!this.isBrowser || !imagePath) {
            return of('');
        }

        const storageRef = ref(storage, `proofs/${imagePath}`);
        return from(getDownloadURL(storageRef)).pipe(
            take(1),
            timeout(5000),
            retry(1),
            catchError(error => {
                console.error('Error fetching image:', error);
                return of('');
            })
        );
    }
}
