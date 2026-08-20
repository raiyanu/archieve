#include <stdio.h>
#include <stdlib.h>

int main()
{
    int age,mark;
    char ps[20];
    printf("Hello world!\n");
    printf("enter your age :");
    scanf("%d",&age);
    printf("\nenter your marks :");
    scanf("%d",&mark);
    printf("\nenter your personality :");
    scanf("%s",&ps);
    printf("\n\n ======================================================\n\n");
    printf("you are a %d years old \n",age);
    printf("but you got %d marks \n",mark);
    printf("however you are a %s guy \n",ps);
    getchar();
    return 0;
}
