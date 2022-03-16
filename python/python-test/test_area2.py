from datetime import timedelta, date
import random

start_date = date(1958, 8, 4)
end_date = date(2020, 2, 25)



time_between_dates = end_date - start_date
days_between_dates = time_between_dates.days
random_number_of_days = random.randrange(days_between_dates)

random_date = start_date + timedelta(days=random_number_of_days)

print(random_date)

print(date.today())

test = random.randrange((date.today() - start_date).days)

end = start_date + timedelta(days=test)

print(end)