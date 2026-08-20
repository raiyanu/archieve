#include<iostream>
#include<conio.h>
using namespace std;
class A{
	public:
		A(){
			cout<<"constructor of class A is called"<<endl;
		}
};

class B{
	public:
		B(){
			cout<<"constructor of class B is called"<<endl;
		}
};

class C: public A , public B{
	public:
		C(){
			cout<<"constructor of class C is called"<<endl;
		}
};

int main(){
	C obj;
	return 0;
}
