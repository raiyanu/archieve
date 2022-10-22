#include<iostream>
using namespace std;
class hello_world{
	public:
		//constructure
		hello_world()
		{
			cout<<"contructure is called"<<endl;
		}
		void display()
		{
			cout<<"hello world"<<endl;
		}
};
int main()
{
	hello_world obj;
	obj.display();
	return 0;
}
