import java.util.Scanner;

public class nain {
	public static void main(String[] args) {
		Scanner scan = new Scanner(System.in);
		System.out.print("welcome bruh\nenter which day of the week is it in number:");
		int day = scan.nextInt();
		scan.close();
		switch (day) {
		case 1: {
			System.out.println("It's Sunday");
			break;
		}
		case 2: {
			System.out.println("It's Monday");
			break;
		}
		case 3: {
			System.out.println("It's Tuesday");
			break;
		}
		case 4: {
			System.out.println("It's Wednesday");
			break;
		}
		case 5: {
			System.out.println("It's Thursday");
			break;
		}
		case 6: {
			System.out.println("It's Friday");
			break;
		}
		case 7: {
			System.out.println("It's Saturday");
			break;
		}
		default:
			throw new IllegalArgumentException("Unexpected value: " + day);
		}
		
	}

}
