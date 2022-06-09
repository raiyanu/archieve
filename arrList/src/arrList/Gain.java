package arrList;

import java.util.ArrayList;

public class Gain {
	public static void main(String[] args) {
		System.out.println("to make a array we need to use \nArrayList<data_type> new_array_name= new ArrayList<data_type>();");
		ArrayList<String> arr = new ArrayList<String>();
		arr.add("bruh");
		arr.add("yeah bruh");
		for (int z = 0; z < arr.size(); z++) {
			for (int i = 0; i < arr.get(z).length(); i++) {
				System.out.println(arr.get(z).charAt(i));
				
			}
		}
		System.out.println("Arry list size are taken within size(), and String by length");
		System.out.println("arr.set(indexposition, new element) is good stuff tho");
	}
				
}
