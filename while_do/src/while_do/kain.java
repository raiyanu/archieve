package while_do;

import java.util.Scanner;

public class kain {

	public static void main(String[] args) {
		
		Scanner scan = new Scanner(System.in);
		String name = "";
		do {
			System.out.print("Enter you GF name:");
			name = scan.nextLine();
		} while (name.isBlank());
		scan.close();
		System.out.println("your GF name is "+name);
	}

}
