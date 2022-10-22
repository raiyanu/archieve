package NearMe;

import java.io.FileWriter;
import java.io.IOException;
import java.util.Scanner;

public class create_user {
	 void c_list() throws IOException{
		Scanner scan = new Scanner(System.in);
			System.out.println("Enter your user name :");
				String u_name = scan.next();
			System.out.println("Enter your password :");
				String password = scan.next();
		// ============================================================

		FileWriter user_list = new FileWriter("user",true);
		user_list.append(u_name+"\r\n");
		user_list.close();
		FileWriter db = new FileWriter("db",true);
		//db.write(u_name+":"+password);
		db.append(u_name+":"+password+"\r\n");
		db.close();
		scan.close();
		System.out.println("user has been created successfully ");
		
		
	}

}
