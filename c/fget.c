#include<stdio.h>
#include<stdlib.h>
int main()
{
    char chocolate[10];
    printf("hey tell me how much chocolate you want!");
    fgets(chocolate,10,stdin);
    printf("hey why do you want that so much chocolate %s is too much bad for your health",chocolate);
    getch();
}
