#include<stdio.h>
#include<stdlib.h>
#include<conio.h>
int main()
{
    char name[20];
    printf("    ~HEY LOVE~");
    printf("\n      enter your name :");
    fgets(name,20,stdin);
    printf("\n      nice to meet you %s",name);
    love("hey");
    return 0;
}
void love(char dum[20])
{
    char name[20];
    printf("\n %s \n",dum);
    printf("\n     ~HEY LOVE~");
    printf("\n      enter your name :");
    fgets(name,20,stdin);
    printf("\n      nice to meet you %s \n\n\n\n\n",name);
}
