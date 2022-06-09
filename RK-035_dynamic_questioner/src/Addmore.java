import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Scanner;

public class Addmore {
	void addy(String user_name) throws IOException {
		Scanner scan = new Scanner(System.in);
		int conti =1, option,answer;
		String optii;
		do {
			FileWriter qf = new FileWriter("question.txt",true);
			System.out.println("Enter your question :");
			String ques = scan.nextLine();

			ArrayList<String> options = new ArrayList<String>();
			System.out.println("Enter how may option you wanna add :");
			option = scan.nextInt();
			scan.nextLine();
			for (int i = 1; i <= option; i++) {
				System.out.println("Enter option for "+i+":");
				String optioner = scan.nextLine();
				options.add(optioner);
			}
			StringBuilder string = new StringBuilder();
			for (int i = 0; i < options.size(); i++) {
				 string.append((i+1)+options.get(i)+",");
			}
			System.out.println("Answer: ");
			answer = scan.nextInt();
			scan.nextLine();
			qf.append("\n"+ques+","+option+","+string+answer);
			//how_many_girls,2,,03girls,14girls,,2
			qf.close();
			
			System.out.println("Do you wanna add more question : y or n");
			optii = scan.nextLine();
			optii.toLowerCase();
			if(optii.equals("n")) {
				conti++;
			}
		}while(conti ==1);
		scan.close();
	}
}
