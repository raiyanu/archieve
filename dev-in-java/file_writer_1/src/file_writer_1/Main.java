package file_writer_1;

import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Scanner;

public class Main {

	public static void main(String[] args) throws IOException {
		int conti =1, option,answer;
		String optii;
		Scanner scan = new Scanner(System.in);
		do {
			FileWriter qf = new FileWriter("question.txt",true);
			System.out.print("\nEnter your question :");
			String ques = scan.nextLine();
			System.out.print("\nEnter how may option you wanna add :");
			option = scan.nextInt();
			ArrayList<String> options = new ArrayList<String>();
			for (int i = 1; i <= option; i++) {
				System.out.println("Enter option for "+i+":");
				String optioner = scan.next();
				options.add(optioner);
			}
			StringBuilder string = new StringBuilder();
			for (int i = 0; i < options.size(); i++) {
				 string.append(i+options.get(i)+",");
			}
			System.out.println("Answer: ");
			answer = scan.nextInt();
			scan.next();
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

	}

}
