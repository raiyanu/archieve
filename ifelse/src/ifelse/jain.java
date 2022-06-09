package ifelse;

import java.util.Scanner;

public class jain {

	public static void main(String[] args) {
		System.out.print("WELCOME to PH\nbefore continuing please\nEnter your age bro! :");
		Scanner scan = new Scanner(System.in);
		int age = scan.nextInt();
		if (age>=18) {
			System.out.println("bro you are an adult, you are allowed to enter");
		}else {
			System.out.println("bro become older more");
		}

	}

}
