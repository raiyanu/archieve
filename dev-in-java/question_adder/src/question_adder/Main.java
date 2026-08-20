package question_adder;

import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Scanner;

public class Main {

	public static void main(String[] args) throws IOException {
		
		// add questions more
		Scanner scan = new Scanner(System.in);
		int conti =1, option,answer;
		String optii;
		do{
			FileWriter qf = new FileWriter("question.txt",true);
			System.out.println("Enter your question :");
			String ques = scan.next();
			System.out.println("Enter how may option you wanna add :");
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
			qf.append("\n"+ques+","+option+","+string+answer);
			//how_many_girls,2,,03girls,14girls,,2
			qf.close();
			
			System.out.println("Do you wanna add more question : y or n");
			optii = scan.next();
			optii.toLowerCase();
			if(optii.equals("n")) {
				conti++;
			}
		}while(conti ==1);
		scan.close();
		}

	

}
