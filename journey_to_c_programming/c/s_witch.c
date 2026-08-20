#include<stdio.h>
#include<stdlib.h>
char main()
{
    char stringer='A';
    /* printf("hey bruh enter your grade in stupid lesson maths :");
    fgets(stringer,2,stdin);
    printf("\n okey so you got %s",stringer); */
    switch (stringer)
    {
    case 'A':
        printf("\n A is realy good, stupid nerdy");
        break;
    case'B':
        printf("\n B is realy fine enough, stupid nerdy");
        break;
    case'C':
        printf("\n C is realy nice, stupid");
        break;
    case'D':
        printf("\n D is realy fine, stupid ");
        break;
    case'F':
        printf("\n F ?? really i hate that lesson but...oh hell!");
        break;
    }
return stringer;
}
