#include<stdio.h>
#include<stdlib.h>
#include<string.h>
int main()
{
    // declaring variables
    int num1;
    char id[20];
    // get age from user
    printf("\n enter your age : ");
    scanf("%d",&num1);
    // get info if he have id card
    printf("\n you said : %d",num1);
    printf("\n do you have voter id yes or no : ");
    scanf("%s",&id);
    printf("\n you said  : %s",id);

    // declaring a yes string / array so we can use
    //it to compare it upcoming if statement
    char ex[20]="yes";
    // if statement - first to check weather he is older than 18 or equal to 18
    if (num1 >=18) {
        // here we verify if he have id and compare string
        // and uses strcmp with ! (!strcmp(object1,object2) if both  are same then it will print allow
        if(strcmp(id,ex)==0){
        printf("\n you allowed to vote\n",num1);
        } else {
        printf("\n you are not allowed to vote\n");
        }
    } else{
        printf("\n you are not allowed to vote\n");
    }
    getch();
    return 0;
}
