import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Scanner;

public class Main {

	public static void main(String[] args) throws IOException{
			Scanner scan = new Scanner(System.in);
			int score=1;
			FileWriter filer = new FileWriter("users.txt",true);
			System.out.print("please enter your name :");
			String user_name = scan.nextLine();
			System.out.println("What would you like to do?\n1.start game\n2.add more questions(with existing question)\n3.make new question(by removing old)");
			int response = scan.nextInt();
			scan.nextLine();
			if (response==1) {
				// game starts
				// gets question ----------------------------------------------------------
			  	// The line number
				File file = new File("question.txt");
				FileReader fileReader = new FileReader(file);
				BufferedReader bufferedReader = new BufferedReader(fileReader);
				//StringBuffer stringBuffer = new StringBuffer();
				ArrayList<String> question_line = new ArrayList<String>();
				String line;
				while ((line = bufferedReader.readLine()) != null) {
					question_line.add(line);
				}
				fileReader.close();
				try {
					System.out.println(question_line.get(1));
				} catch (Exception e) {
					System.out.println("maybe line doesnt exist  "+e);
				}

		      	filer.append("\n"+user_name+" "+ score);
		      	filer.close();
			} else if(response == 2) {
				// add questions more
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
				
	}
			 else if (response==3) {
				// add new question 
				 int conti =1, option,answer;
					String optii;
					FileWriter qf1 = new FileWriter("question.txt");
					qf1.append("Question,	NumberOfOption,	Options...,	Nth Answer");
					qf1.close();
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
				 

			 }

}}
