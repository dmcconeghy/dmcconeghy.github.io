from datetime import date, datetime


today = date.today()

day_of_week = today.weekday()

print(day_of_week)

today_as_ordinal = today.toordinal()

print(today_as_ordinal)
adjusted = today_as_ordinal + 3

print(date.fromordinal(adjusted))

day_validator = {
            '0' : 1,
            '1' : 0,
            '2' : -1,
            '3' : -2,
            '4' : -3,
            '5' : 3,
            '6' : 2
        }

adjustment = day_validator.get(str(day_of_week))
print(adjustment)