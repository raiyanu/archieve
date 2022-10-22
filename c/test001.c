#include <stdio.h>
#include <string.h>
#include <math.h>
#include <stdlib.h>
void main() {
int num1, num2, i, j, flag, temp, count = 0;
printf("Enter the value of num1 and num2 \n");
scanf("%d %d", &num1, &num2);
if (num2 < 2)
{
printf("There are no primes upto %d\n", num2);
exit(0);
}
printf("Prime numbers are \n");
temp = num1;
if ( num1 % 2 == 0)
{
num1++;
}
i= num1;
while (i<=num2)
{
flag = 0;
for (j = 2; j <= sqrt(num2); j++)
{
if ((i % j) == 0)
{
flag = 1;
break;
}
}
if (flag == 0)
{
printf("%d\n", i);
count++;
}
i= i+2;
}
printf("Number of primes between %d & %d = %d\n", temp, num2, count);
}
