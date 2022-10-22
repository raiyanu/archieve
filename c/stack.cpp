#include<iostream>
#include<conio.h>
using namespace std;

int main(){
	int stack[100], top=-1 , n=100, ent = 0;
	do{
	cout<<"\n\n1. to add element in stack"<<endl;
	cout<<"2. to delete element in stack"<<endl;
	cout<<"3. to view all element in stack"<<endl;
	cout<<"4. to count element in stack"<<endl;
	cout<<"5. to exit!"<<endl;
	cout<<"select an option :";
	cin>>ent;
	switch(ent){
		case 1:{
			cout<<1<<endl;
			pop();
			break;
		}
		case 2:{
			cout<<2<<endl;
			break;
		}
		case 3:{
			cout<<3<<endl;
			break;
		}
		case 4:{
			cout<<4<<endl;
			break;
		}
		case 5:{
			cout<<5<<endl;
			break;
		}
	}	
	}while(ent!=5);
	
}
