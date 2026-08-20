
public class Main {

	public static void main(String[] args) {
		String name = "ray";
		// to check if string is equal to another string 
		Boolean cmpr = name.equals("ray");
		Boolean cmpr1 = name.equals("roy");
		System.out.println(" String name = \"ray\";");
		System.out.println("the resutl for compareing using name.equals (\"ray\");  "+cmpr);
		System.out.println("the resutl for compareing using name.equals (\"roy\");  "+cmpr1);
		System.out.println("===============================================================");
		// to ignore case sensitive problem
		Boolean cmpr2 = name.equals("Ray");
		Boolean cmpr3 = name.equalsIgnoreCase("RAy");
		System.out.println("the resutl for compareing using name.equals(\"Ray\");  "+cmpr2);
		System.out.println("the resutl for compareing using name.equalsIgnoreCase(\"RAY\");  "+cmpr3);
		System.out.println("===============================================================");
		int lenOFstring = name.length();
		System.out.println("the lenth of name string \nis int lenOFstring = name.length(); is  "+lenOFstring);
		System.out.println("===============================================================");
		char ch = name.charAt(0);
		System.out.println("now i am gonna print one character of name string char ch = name.charAt(0); \n:"+ch);
		System.out.println("hence there are many types of string funtion available in java unlike cpp its easy to work with them\nits nothing much of deal!!");
	
	
	
	}

}
