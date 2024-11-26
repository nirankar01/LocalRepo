import numpy as np
import streamlit as st
import re
import pandas as pd
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

# read data
news_df = pd.read_csv('train.csv')

# processing
news_df.isnull().sum()
# news_df.shape
news_df = news_df.fillna(' ')
news_df.isnull().sum()
news_df['content'] = news_df['author']+' '+news_df['title']

# seprating data and level
X = news_df.drop('label',axis=1)
y = news_df['label']

# steamming
ps = PorterStemmer()
def stemming(content):
    stemmed_content = re.sub('[^a-zA-Z]',' ',content)
    stemmed_content = stemmed_content.lower()
    stemmed_content = stemmed_content.split()
    stemmed_content = [ps.stem(word) for word in stemmed_content if not word in stopwords.words('english')]
    stemmed_content = ' '.join(stemmed_content)
    return stemmed_content

news_df['content'] = news_df['content'].apply(stemming)
# news_df['content']

X = news_df['content'].values
y = news_df['label'].values

vector = TfidfVectorizer()
vector.fit(X)
X = vector.transform(X)

# print(X)

# Splitting the dataset to training & test data
X_train, X_test, Y_train, Y_test = train_test_split(X, y, test_size = 0.2, stratify=y, random_state=2)
# X_train.shape

model = LogisticRegression()
model.fit(X_train,Y_train)

# on training set
train_y_pred = model.predict(X_train)
# print(accuracy_score(train_y_pred,Y_train))

# on testing set
testing_y_pred = model.predict(X_test)
# print(accuracy_score(testing_y_pred,Y_test))

# Detection System
input_data = X_test[10]
prediction = model.predict(input_data)

if prediction[0] == 0:
    print('The News Is Real')
else:
    print('The News is Fake')

news_df['content'][2]


# website
st.title('Fake News Detector')
input_text=st.text_input('Enter new Article')

def prediction(input_text):
    input_data=vector.transform([input_text])
    prediction=model.predict(input_data)
    return prediction[0]
if input_text:
    pred=prediction(input_text)
    if pred==1:
        st.write('The News is Fake')
    else:
        st.write("The News is Real")