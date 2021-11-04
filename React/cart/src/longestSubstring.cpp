#include<bits/stdc++.h>
using namespace std;


int main()
{

	string s;
	cin>>s;
	int l=s.length();
	int count=0;
	int maxi=0;
	map<char,int> m;
	int stpoint=0;
	for(int i=0;i<l;i++)
	{
          if(m[s[i]]>0 && m[s[i]]>=m[s[stpoint]])
          {
          	stpoint=m[s[i]];
            count=i-m[s[i]];
            
          }
          m[s[i]]=i+1;
          count++;
          
          maxi=max(maxi,count);
         
	}

	cout<< maxi<<endl;
	
}