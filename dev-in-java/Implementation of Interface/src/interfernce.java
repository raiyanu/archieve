
class salary
{
	void show_salary( )
	{
		System.out.println("salary: 100000");
	}
}

interface commission
{
	void show_comm( );
}
class income extends salary implements commission
{
	public void show_comm( )
	{
		System.out.println("commission: 1000");
	}
	void show_income( )
	{
		System.out.println("Total income includes");
		show_salary( );
		show_comm( );
	}
	public static void main( String args [ ])
	{
		income in=new income( );
		in.show_income( );
	}
}