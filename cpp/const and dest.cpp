#include<iostream>
#include<conio.h>
using namespace std;
class A{
	public:
		A(){
			cout<<"constructor of class A is called"<<endl;
		}
		~A(){
			cout<<"destructor of class A is called"<<endl;
		}
		void disp(){
			cout<<"HEllo world"<<endl;
		}
};
int main(){
	A obj;
	obj.disp();
	return 0;
}
