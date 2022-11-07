from django.db import connection
import pandas as pd
import sqlite3

# Reads data from csv file


def transaction_formatter(day, dao, date):
    df = pd.read_csv("1week_snapshots/day" + str(day) + "/" +
                     str(dao) + "_" + str(date) + "_1day_trans_data.csv")

    # Formats the date
    for dt in range(len(df['date_time'])):
        no_t_string = df['date_time'][dt].replace('T', ' ')
        clean_string = no_t_string.split('+')[0]
        df['date_time'][dt] = clean_string

    # Converts the column to a date time field
    df['date_time'] = df['date_time'].astype('datetime64[ns]')

    # Adds the contract address to the transaction data
    daos_contract_addresses = {'aave': '\\x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9', 'ape': '\\x4d224452801ACEd8B2F0aebE155379bb5D594381',
                               'chz': '\\x3506424F91fD33084466F402d5D97f05F8e3b4AF', 'fwb': '\\x35bD01FC9d6D5D81CA9E055Db88Dc49aa2c699A8'}

    for d, c in daos_contract_addresses.items():
        if d == dao:
            df['contract_address'] = [
                c.lower()] * len(df)

    return df


def dao_formatter(dao):
    daos_information = {'aave': ['\\x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9', 'Aave DAO', 'AAVE'], 'ape': ['\\x4d224452801ACEd8B2F0aebE155379bb5D594381', 'ApeCoin DAO', 'APE'],
                        'chz': ['\\x3506424F91fD33084466F402d5D97f05F8e3b4AF', 'Chiliz DAO', 'CHZ'], 'fwb': ['\\x35bD01FC9d6D5D81CA9E055Db88Dc49aa2c699A8', 'Friends with Benefits DAO', 'FWB']}

    data = []
    for d in daos_information:
        if d == dao:
            data.append([daos_information[d][0].lower(), daos_information[d]
                        [1], daos_information[d][2]])

    df = pd.DataFrame(
        data, columns=['contract_address', 'name', 'token_symbol'])
    return df


#df = transaction_formatter(7, "aave", "09192022")
df = dao_formatter("fwb")
cnx = sqlite3.connect('C:/Users/Student/researchsite/db.sqlite3')
#df.to_sql('daos_transaction', cnx, if_exists='append', index=False)
df.to_sql('daos_dao', cnx, if_exists='append', index=False)
# cnx.cursor()
# cnx.execute('DELETE FROM django_migrations WHERE app = "daos";')
cnx.commit()
cnx.close()
