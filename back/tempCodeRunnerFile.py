for row in cur.execute('\
    SELECT * FROM base_customerprofile \
                    inner join base_customerprofile on base_customerprofile.user_id = auth_user.id   \
                           '):
    print(row)