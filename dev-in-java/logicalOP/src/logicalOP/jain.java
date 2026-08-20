package logicalOP;

import java.util.Scanner;

public class jain {

	public static void main(String[] args) {
		Boolean day = true;
		Boolean night = true;
		Scanner scan = new Scanner(System.in);
		System.out.println("hey!\n is it day?");
		String ans = scan.next();
		if (ans=="y" && ans == "Y" && ans == "Yes" && ans == "yes" && ans == "YES" ) {
			day = true;
		} else {
			day = false;
		}
		System.out.println("is it night?");
		String ans1 = scan.next();
		scan.close();
		if (ans1=="y" && ans1 == "Y" && ans1 == "Yes" && ans1 == "yes" && ans1 == "YES" ) {
			night = true;
		} else {
			night = false;
		}
		if (day && night) {
			System.out.println("bro it can't be day and night at the same time huh");
		} else if (day) {
			System.out.println("have a nice day bro");
		} else if (night) {
			System.out.println("good night bruh");
		} else {
			System.out.println("you break the program bruh");
		}
		

	}

}
