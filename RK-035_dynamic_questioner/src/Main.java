import java.io.IOException;
import java.util.Scanner;

import javax.swing.JFrame;

public class Main {

	public static void main(String[] args) throws IOException{
			JFrame frame = new JFrame();
			frame.setVisible(true);
			Scanner scan = new Scanner(System.in);
			System.out.print("please enter your name :");
			String user_name = scan.nextLine();
			System.out.println("What would you like to do?\n1.start game\n2.add more questions(with existing question)\n3.make new question(by removing old)");
			int response = scan.nextInt();
			scan.nextLine();
			if (response==1) {
				play Play = new play();
				Play.player_run(user_name);
			} else if(response == 2) {
				Addmore addy = new Addmore();
				addy.addy(user_name);
			} else if (response==3) {
				// add new question 
				Addnew addnew = new Addnew();
				addnew.newadd(user_name);
			}else {
				System.out.println("wrong! input");
			}
			scan.close();

}}
