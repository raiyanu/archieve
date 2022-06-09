#include<iostream>
#include<conio.h>
using namespace std;

void numbers(int i){
	cout<<"this is a int :"<<i<<endl;
}
void numbers(float i){
	cout<<"this is a float :"<<i<<endl;
}
void numbers(string i){
	cout<<"this is a string :"<<i<<endl;
}
int main(){
	numbers(12);
	numbers(3.9f);
	numbers("this");
}
