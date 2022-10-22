#include<iostream>
#include<conio.h>
using namespace std;

class XYZ{
		int num;
		char ch;
	public:XYZ(){
		num=100;
		ch='Z';
	}
		
	friend void disp(XYZ obj);
};
void disp(XYZ obj){
	cout<<obj.num<<endl;
	cout<<obj.ch<<endl;
}
int main(){
	XYZ obj;
	disp(obj);
	
	return 0;
}
