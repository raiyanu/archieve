import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Scanner;

public class play {
		void player_run(String user_name) throws IOException{
			Scanner scan = new Scanner(System.in);
			int score;
			FileWriter filer = new FileWriter("users.txt",true);
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
			score = scan.nextInt();
	      	filer.append("\n"+user_name+" "+ score);
	      	System.out.println("playing will be updated in future ... ");
	      	filer.close();
	      	scan.close();
		}
}
