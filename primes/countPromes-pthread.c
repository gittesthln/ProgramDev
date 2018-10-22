#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <pthread.h>

#define L      32000    /* limit of primes stored in memory */
#define Pnum    3500    /* size of area which stores primes */
#define LIMIT 1000000000

#define MaxThreads  10
#define MAXProcess 10

#define MoreMemLENGTH  16000  /* define sieve area size */
#define MAXLENGTH  9000    /* define maximum of sieve area size */
#define LENGTH    8000    /* default size of sieve area */

int MaxProcess = MAXProcess;
int Step = (LIMIT/MAXProcess);

#define TRUE 1
#define FALSE 0
char Quiet =FALSE;

int Length = LENGTH;
int Prime[ Pnum ];
int ic;

int GenerateSmallPrimes( void ){
  int i, j;
// set some of first primes and some value
    Prime[0] = 2;
    Prime[1] = 3;
// get primes up to L , using  simple methods */
    ic = 1;
    for( i = 5; i<= L; i+= 2) {
        for( j = 1; j<= Pnum; j++) {
            if (i % Prime[j] == 0) break;
                 // if i is divided some smaller prime then composite.
      if (i < (Prime[j]+2)*(Prime[j]+2)) {     /* test is suffiiect ? */
          Prime[++ic] = i;  // save new prime
          break;
      }
        }
    }
    return   ic;
}
void *GetNoPrimes(void *m){
  int i, j, k, n;
  int  Lower, upper;

  int NextSieve[Pnum], *pNextSieve;
  int Count;

  int StartNo = (*(int *)m-1)*Step+1;
  int EndNo = StartNo + Step - 1;
  char *pSieve, Sieve[MAXLENGTH] ;

  for( i = ic; i>= 0; i--) {
    if (StartNo > Prime[i]) break;
  }
  if (StartNo <= Prime[ic]) {
    Lower = Prime[ic] + 2;
    Count = ic - i;
  }  else {
    Lower = (StartNo / 2) * 2 + 1;
    Count = 0;
  }
  n = Lower;
  upper = Lower + Length * 2;
//
//  initialize sieve area and sieave parameters
//
  for( i = Length, pSieve = Sieve; i>0; i--) *pSieve++ = TRUE;
  for( i = 0; i< Pnum;i++) NextSieve[i] = -1;
//
// making primes greater than L
// for every sieve element , we assign only ODD numbers from variable lower
//
  for( ;; ) {
    for (i = 1, pNextSieve = &(NextSieve[1]); i<= ic; i++) {
      k = Prime[i];
      if((j = *pNextSieve) < 0) {
        j = Lower % k;
        if (j != 0)  j = k - j;
                         // if j is odd , the least number divided by prime[ i ]
                         //   and not less than lower must be even
        j= ((j & 1) == 0)?( j >> 1):((j + k) >> 1);
      }
      for (pSieve = Sieve+j; j < Length; j += k, pSieve+=k) *pSieve = FALSE;
            // sieve out multiple of prime[ i ]
        *pNextSieve++ = j - Length; // store next position of multiple of prime[ i ]
      if (upper < (k+2)*(k+2)) break;// sufficient ? 
    }
//   search primes , call work program and initialize sieve area
    for( i = Length, pSieve = Sieve; i>0 ; pSieve ++, i--) {
      if (*pSieve){
        if (n >= EndNo) {
          if(!Quiet)
          printf("Number of Primes between %10d and %10d %10d\n", StartNo,EndNo,Count);
//          free(Sieve);
          return 0;
        }
        Count++;
      } else 
        *pSieve = TRUE;
      n += 2;
    }
    Lower = upper;
    upper += Length * 2;
  }
}
int main(int argc, char *argv[]) {
  int i ;
  pthread_t hThreads[MaxThreads];
  int threadID[MaxThreads];
  int rc;
  int StartTick;
  int Threads;
  int slot;
  char ShortReport=FALSE;
  int no[MaxThreads];
  for(i=0;i<MaxThreads;i++){
    no[i]=i+1;
  }
  for(i = 1; i <argc; i++) {
    if(*argv[i] != '-') break;
    switch (*(argv[i]+1)) {
    case 'P':
      MaxProcess = atoi(argv[i]+2);
      if(MaxProcess <=0) MaxProcess = 1;
      Step = LIMIT/MaxProcess;
      break;
    case 'L':
      Length = atoi(argv[i]+2);
      if(Length > MAXLENGTH) Length = MAXLENGTH;
      break;
    case 'Q':
      Quiet = TRUE;
      break;
    case 'S':
      ShortReport =TRUE;
      break;
    default:
      puts("Generate and Count Prime Numbers upto 10^9\n"
         "runs in multithreads, Version 3.2\n"
         "Copyright 1997 T.Hilano\n"
         "usage : genprime [-L<num1>] [-Q] [-P<num>] [-S] [<num2>]\n"
         "options: -L<num1> Use <num1> bytes as sieve area.(Max 16Kbytes)\n"
         "         -Q       No Reports when every Thread ends.\n"
         "         -P<num>  Divedes Job into <num> subprocesses.\n"
         "         -S       Make Short Summary when job ends.\n"
         "<num2>: The number of Threads at same time(Max 20)\n"
         "          if ommitted, runs sequentially.\n");
      return 0;
    }
  }
  if( Length <1000) Length = 1000;
  ic = GenerateSmallPrimes();
  if( argc == i) {    //With no arguments, Execute sequencially
    Threads = 0;
    for (i=1;i<= MaxProcess; i++) {
      GetNoPrimes((void *)&i);
    }
  } else {        // Number of Threads must be between 1 to MaxThreads
    Threads = atoi( argv[i]);
    if(Threads <=0) {
      Threads = 1;
    } else if(Threads >MaxThreads) Threads = MaxThreads;

    for (i=0; i<Threads; i++){    //Start number of Threads required
      pthread_create(hThreads+i, NULL, &GetNoPrimes, (void *)(no+i));
    }
    for (i=1; i<=Threads; i++){    //Start number of Threads required
      pthread_join(hThreads[i-1], NULL);
    }
  }
  if( ShortReport ) {
    printf("%s LM %d %d %d %d.%3.3d\n", 
      argv[0], Threads, MaxProcess, Length, StartTick/1000,StartTick%1000);
  } else {
    printf("Summary:\n%s\n"
      "Memrory Model: Needs Less Memories\n",argv[0]);
    printf("Number of Threads:       %d\n", Threads);
    printf("Number of Process:       %d\n", MaxProcess);
    printf("Sieve Area Size:%5dbytes\n", Length);
    printf("Elasped Time :    %d.%3.3dsec\n", StartTick/1000, StartTick %1000);
  }
}
