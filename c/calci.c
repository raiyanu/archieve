#include<stdio.h>
#include<stdlib.h>
#include<conio.h>
int main()
{
    int num1 , num2;
    char op;
    printf("    ~HEY LOVE~");
    printf("\n      enter your number 1 :");
    scanf("%d",&num1);
    printf("\n      enter your number 2 :");
    scanf("%d",&num2);
    printf("\n      what operation      :");
    scanf("%s",&op);
    love(op,num1,num2);
    return 0;
}
void love(char *oop)
{
    /*,int n1,int n2*/
    int n1,n2 =3;
    printf("%s",oop);
    /*if (oop=="+"){
        printf("%d",n1+n2);
    } else if (oop=="-"){
        printf("%d",n1-n2);
    } else if (oop=="/"){
        printf("%d",n1/n2);
    } else if (oop=="*"){
        printf("%d",n1*n2);
    } else if (oop=="fun"){
        printf("baakaa");
    } else {
        printf("error");
        main();
        }
    */

}
