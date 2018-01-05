int height = 640;
int width = 480;
int unitx = width/2;
int unity = height/2;
int fire[][] = new int[unitx][unity];
color palette[] = new color[256];
int index = 0;

void setup(){
  size(width, height);
  for(int i=0, index = 0; i < 64; i++, index++){
      palette[index] = color(i*4, 0, 0);
      palette[index+64] = color(255, i*4, 0);
  }
  for(int i=0, index = 128; i < 128; i++, index++){
      palette[index] = color(255, 255, i*2);
  }
  frameRate(60);
}

void makefire(){
  for(int i=0; i < unitx; i++){
    fire[i][0] = (int)(random(1.0)*256);
  }
  for(int x=0; x < unitx; x++){
    int x1, x2, x3;
    if(x==0) x1 = fire[unitx-1][0];
    else x1 = fire[x-1][0];
    x2 = fire[x][0];
    if(x==unitx-1) x3 = fire[0][0];
    else x3 = fire[x+1][0];
    fire[x][1] = (int)((x1+x2+x3)/3.0);
  }
  for(int y=2; y < unity; y++){
    for(int x=0; x < unitx; x++){
      int x1, x2, x3, x4;
      if(x==0) x1 = fire[unitx-1][y-1];
      else x1 = fire[x-1][y-1];
      x2 = fire[x][y-1];
      x4 = fire[x][y-2];
      if(x==unitx-1) x3 = fire[0][y-1];
      else x3 = fire[x+1][y-1];
      fire[x][y] = (int)((x1+x2+x3+x4)/4.0);
    }
  }
}

void draw(){
  background(0);
  
  makefire();
  
  text("hoge", 0,0);
  for(int x=0; x < unitx; x++){
    for(int y=0; y < unity; y++){
      fill(palette[fire[x][y]]);
      //fill(fire[x][y], 0);
      rect(5*x, height-5*(y+1), 5, 5);
    }
  }
}

