import java.io.FileWriter;
import java.io.IOException;

public class Main {

	public static void main(String[] args) {
		try {
			FileWriter qf = new FileWriter("question.txt",true);
			
			int num=1021;
			String string ="hey baka ";
			qf.append("hey"+num+string);
			qf.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

}
