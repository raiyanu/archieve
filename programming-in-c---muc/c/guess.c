#include<stdio.h>
#include<stdlib.h>
#include<conio.h>
int main()
{
    /* variable declaration */
    int guess;
    int secretnum  = 93;
    int guesslimit = 2;
    int outofguess = 0;
    int guesscount = 0;


    while(guess!=secretnum&&outofguess==0)
    {/* loop open */
        if (guesscount<=guesslimit)
            {/* if open */
                printf("hey enter correct number");
                scanf("%d",&guess);
                guesscount++;
            }
        else{
                outofguess = 1;
        /* if end*/
            }
    /* loop open */
    };


    if (outofguess=0)
        {/* 2nd if open */
            printf("HURRAY YOU WIN!!!");
        }
    else
        {
            printf("you lost");
/*  2nd if close */
        }
}
