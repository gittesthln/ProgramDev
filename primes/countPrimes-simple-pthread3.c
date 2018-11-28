#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <pthread.h>

#define L       32000		/* limit of primes stored in memory */
#define Pnum		 3500		/* size of area which stores primes */
#define LIMIT 100000000

#define MaxThreads  10

#define TRUE 1
#define FALSE 0

// set some of first primes and some value
int Prime[  Pnum ] = {2,3};//    Prime[0] = 2, Prime[1] = 3;
int Prime2[ Pnum ] = {2*2,5*5};//    Prime2[0] = 4, Prime[1] = 25;
int ic, Cnt = 0;
int Step;

int GenerateSmallPrimes( void ){
  int i, j, ic = 1;
// get primes up to L , using  simple methods */
    for( i = 5; i<= L; i+= 2) {
        for( j = 1; j<= Pnum; j++) {
            if (i % Prime[j] == 0) break;
                 // if i is divided some smaller prime then composite.
			if (i < (Prime[j]+2)*(Prime[j]+2)) {     /* test is suffiiect ? */
					Prime[++ic] = i;  // save new prime
          Prime2[ic] = i*(i+2);
					break;
			}
        }
    }
    return   ic;
}
void * GetNoPrimes(void *m){
	int i, j;
	int Count = 0;
	int Start = (*(int *)m-1)*Step+1;
	int End = Start + Step - 1;
  int *P, *P2;

  for(i=Start; i<End; i+=2){
    P = Prime;
    P2 = Prime2;
    for( j = 1; j<= Pnum; j++) {
      if (i % *P++ == 0) break;
      // if i is divided some smaller prime then composite.
			if (i < *P2++) {     /* test is suffiiect ? */
        Count++;
        break;
			}
    }
  }
  printf("Number of Primes between %10d and %10d %10d\n", Start,End,Count);
  Cnt += Count;
}

int main(int argc, char *argv[]) {
  int i;
	pthread_t hThreads[MaxThreads];
	int threadID[MaxThreads];
	int Threads;
  int threadParams[MaxThreads];
  for(i=0;i<MaxThreads;i++){
    threadparams[i]=i+1;
  }
	for(i = 1; i <argc; i++) {
		if(*argv[i] != '-') break;
    puts("Generate and Count Prime Numbers upto 10^9\n"
				 "runs in multithreads, Version 3.2\n"
				 "Copyright 1997 T.Hilano\n"
				 "usage : genprime [<num>]\n"
				 "<num>: The number of Threads at same time(Max 20)\n"
				 "          if ommitted, runs sequentially.\n");
    return 0;
	}
	ic = GenerateSmallPrimes();
	if( argc == i) {//With no arguments, Execute sequencially
    Step = LIMIT/MaxThreads;
		for (i=1;i<= MaxThreads; i++) {
			GetNoPrimes((void *)&i);
		}
	} else {				// Number of Threads must be between 1 to MaxThreads
		Threads = atoi( argv[i]);
		if(Threads <=0) {
			Threads = 1;
		} else if(Threads >MaxThreads) Threads = MaxThreads;
    Step = LIMIT/Threads;
		for (i=0; i<Threads; i++){		//Start number of Threads required
      pthread_create(hThreads+i, NULL, &GetNoPrimes, (void *)(threadParams+i));
    }
		for (i=1; i<=Threads; i++){		//Start number of Threads required
      printf("%d:%d\n",i,pthread_join(hThreads[i-1], NULL));
		}
	}
  printf("Total number of Primes upto %d is %d\n", LIMIT, Cnt);
}
