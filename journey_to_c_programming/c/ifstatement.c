#include<stdio.h>
#include<stdlib.h>
#include<string.h>

int num1;
char id[20];
int main()
{

    printf("\n enter your age and year you born : ");
    scanf("%d",&num1);
    printf("\n you said : %d",num1);
    printf("\n do you have voter id yes or no : ");
    scanf("%s",&id);
    printf("\n you said  : %s",id);
    char ex[20]="yes";
    if (num1 >=18) {
        if(!strcmp(id,ex)){
        return printf("\n you allowed to vote\n",num1);
        } else {
        return printf("\n you are not allowed to vote\n");
        }
    } else{
        return printf("\n you are not allowed to vote\n");
    }
}
