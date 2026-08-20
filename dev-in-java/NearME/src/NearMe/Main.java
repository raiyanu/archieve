package NearMe;

import java.io.IOException;
import java.util.Scanner;

public class Main {

	public static void main(String[] args) throws IOException {
		// this class and function check if environment is cool and right;
		file_checker check = new file_checker();
		check.check_env(); 
		
		String option ;
		System.out.println("Welcome!\n1) log in \n2) sigh up \n3) exit \nEnter valid option:");
		Scanner scan = new Scanner(System.in);
		option = scan.next();
		scan.close();
		switch (option) {
		case "1":
			System.out.println("this feature will be available in future update");
			break;
		case "2":
			// this class is used to create user in our db(database);
			create_user c_user = new create_user();
			c_user.c_list();
			break;
		case "3":
			System.out.println("this feature will be available in future update");
			
			break;

		default:
			System.out.println("this feature will be available in future update");
			break;
		}

		

	}

}
