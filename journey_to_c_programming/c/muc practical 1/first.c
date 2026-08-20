#include<stdio.h>
#include<stdlib.h>
#include<conio.h>
void main()
{
    int num1=0,num2=1,number;
    printf("enter the number");
    scanf("%d",number);
    printf("%d \n",num1);
    printf("%d \n",num2);
    love(number);
}
void love(int chocolate){
    int num3,i,num1=0,num2=1;
    for (i=2;i<chocolate;i++);
{
    num3=num1+num2;
    printf("%d \n",num3);
    num1=num2;
    num2=num3;
}
}
