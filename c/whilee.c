#include<stdio.h>
#include<stdlib.h>
#include<conio.h>
int main()
{
    int index = 2;
    while (index <= 10)
    {
        int temp = 1;
        while (temp <= index)
        {
            printf("=");
            temp = temp +1;
        };
        index = index +1;
    };

}
