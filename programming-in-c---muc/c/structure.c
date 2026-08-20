#include<stdio.h>
#include<stdlib.h>
#include<conio.h>
struct employee
{
    char name;
    char place;
    char sex;
    char motive;
    int marks;
    int age;
    float gpa;
};
int main()
{
    struct employee guy1;
    strcpy(guy1.name,"Ray");
    strcpy(guy1.place,"vellore");
    strcpy(guy1.sex,"male");
    strcpy(guy1.motive,"millinoire");
    guy1.marks = 342;
    guy1.age= 22;
    guy1.gpa= 2.6;

    struct employee guy2;
    strcpy(guy2.name,"Roy");
    strcpy(guy2.place,"pernambut");
    strcpy(guy2.sex,"male1");
    strcpy(guy2.motive,"died");
    guy2.marks = 223;
    guy2.age= 17;
    guy2.gpa= 4.4;

}
