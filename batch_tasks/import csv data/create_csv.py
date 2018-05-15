import csv

def main():

    with open('contacts.csv', 'w', newline='') as csvfile:
        fieldnames = ['first_name', 'last_name']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

        writer.writeheader()
        for i in range(5000):
            writer.writerow({'first_name': 'This is getting old ' + str(i), 'last_name': 'really old ' + str(i)})


if __name__ == '__main__':
    main()