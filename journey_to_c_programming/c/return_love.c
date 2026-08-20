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
    char goals[20];
    fgets(goals,20,stdin);
    demand(goals);
    return 0;
}
int demand(char dirt[20])
{
    char name[20];
    printf("\n     ~HEY LOVE~");
    printf("\n      enter your name :");
    fgets(name,20,stdin);
    printf("%s",dirt);
    printf("\n      nice to meet you %s",name);
    return 0;
}
