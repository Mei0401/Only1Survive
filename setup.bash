#!/bin/bash
npm install
sqlite3 db/userinfo.db < sql.schema

