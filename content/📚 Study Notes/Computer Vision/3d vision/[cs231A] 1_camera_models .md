---
title: "[cs231A] 1) Camera Models"
tags : 3d vision, cs231A, Camera Models
---

## 들어가며

 3d vision을 공부하기 위해 stanford 대학의 open corseware 강의인 CS231A 강의를 선택하였습니다.

다음 공식 링크 ([cs231A](https://web.stanford.edu/class/cs231a/index.html)) 에서 확인 가능하고 코스노트, 교안 pdf가 공개되어 있습니다. 다만 아쉽게도 강의영상은 공개되어 있지 않으므로 혼자 찾아가며 공부를 해야 할 필요가 있습니다.

개인적으로 제가 가장 관심있고 대학원 진학 분야로 결정지은 것이 computer vision, 그 중 3d vision이여서 관련 공부 자료를 찾아보던 중 괜찮아보여서 선택했었습니다. 그러다가 교수님 컨택 중 이것을 공부한다고 하니 학기 중 숙제 느낌으로 방학전까지 제대로 이걸 끝까지 공부해 오면 좋을 것 같다고, 내용도 물어보신다고 하니 제대로 공부를 하게 되었습니다. 교수님이 내용이 괜찮아 보이신다고 하시니 관련 입문하시는 분들은 들으셔도 좋을 것 같습니다.

비슷한 코스웨어로 CS231n 강의도 완강을 하였는데 그 강의는 아는내용이 많고 강의 영상도 공개가 되어 있어서인지 제 느낌으로는 CS231A가 생각보다 더 어려웠습니다. 특히 수학적인 내용에서 이 강의가 깊게 파고 들수록 많은 분야를 건들기 때문인 것으로 보입니다.\
(선형대수, 확률학 부터 시작해서 미분적분학, 최적화이론, 기하학,,, 더 나아가서 심화를 파고 들면 대수, 미분기하의 수학분야 내용까지 극소량 다룰 수도 있습니다.)

그만큼 수학, 특히 선형대수의 base가 있어야 하며 열심히 해야 된다는 생각도 들었습니다.

참고로 중요도가 낮은 카메라의 역사같은 부분은 건너띄고 교안에 내용이 많이 정리되어 있으므로 다른 내용들도 간략히 요약하는 느낌으로 작성하였습니다.

## Pinhole cameras

![pinhole camera 구조](images\001.png)
pinhole camera는 빛이 여러 방향으로 오는 것을 barrier로 막고 **Aperture** 라는 작은 구멍으로만 빛이 들어오게 하여 물체의 각 점을 이미지 상의 특정 점에 대응 시켜 선명도를 늘인다. 

또한 빛이 구멍에서 교차하므로 실제 카메라 내부에 형성되는 이미지는 상하좌우가 뒤집히게 된다.

![pinhole camera 구조2](images\002.png)
구조를 보기 편하게 바꾸면 위와 같이 직관적으로 생각 할 수 있다.
여기서 $\mathbf o$는 **camera center(카메라 중심)** , $\mathbf f$는 **focal length(초점거리)** 라고한다.

![pinhole camera 구조3](images\003.png)
수식으로 나타내기 편하게 위 그림처럼 나타낼 수 있다.

상이 맺히는 이미지 평면을 $\mathbf \Pi'$이라 하고 3차원 공간의 한 점 $P = \begin{bmatrix} x\\y\\ z \end{bmatrix}$가 이미지 평면 $\mathbf \Pi'$ 위에 $P' = \begin{bmatrix} x'\\ y'\end{bmatrix}$에 대응된다고 하면 **삼각형의 닮음 규칙**에 의해 $\dfrac {x'}f = \dfrac xz$가 된다.\
여기서 $z$는 3d 공간의 한점 $P$의 **깊이**이다.

위 식을 정리하여 매우 중요한 공식을 얻어낼 수 있게 된다.

> $\begin{cases} {x'} = f\dfrac xz \\ {y'} = f\dfrac yz \end{cases}$

위 식을 **Perspective Projection(원근투영)** 이라고 한다.

직관적으로 점 $P$가 카메라 중심에서 멀어질수록 이미지 평면 위에 맺히는 물체의 상이 작아진다는 것을 확인 가능하다.

## Lenses
위 구조에서 aperture의 크기가 중요할까?

만약 크기가 크다면 선명도가 낮아지고 희미하게 이미지가 맺힐 것이다.

반면 크기를 작게 하면 선명도는 높아지지만 들어오는 빛의 양이 절대적으로 작아지게 될 것이다.

이런 trade-off를 방지하기 위해 사용 된 것이 **lense(렌즈)** 다. 렌즈는 빛을 굴절시켜 모아주는 역할을 한다. 이를 통해 선명도도 보장하고 빛의 양도 충분히 들어오게 한다.

렌즈를 통해 들어온 빛이 이미지 상에 제대로 모여야 한다. 그렇지 않으면 Out of focus가 일어날 수 있다. 그래서 **"in focus"** 가 되기 위한 특정한 거리가 있다. 이걸 맞추는 것을 우리는 흔히 일상적으로 **초점을 맞춘다** 라고 하는 것이다.

![Paraxial refraction model](images\004.png)

렌즈를 이용한 구조는 위 사진과 같이 나타낼 수 있다. 

**Snell의 법칙**에 따라 [Eq.3] 식을 유도 할 수 있게 된다. 이는 전에 구했던 식 [Eq.1]과 비교하면 거의 비슷하다는 것을 알 수 있다.

여기서 $z' = f + z_0$이다. 

한 가지 렌즈의 단점이라고 하면 렌즈 왜곡문제가 발생할 수 있다는 것이다.

이 왜곡 문제는 후에 조금 더 자세히 다루기에 나중에 설명하겠다.

## Intrinsic Projection

여기서 부터는 복잡하지만 매우 중요한 내용들이다. 

이제부턴 **실제 3D 좌표를 디지털 이미지의 픽셀 좌표로 어떻게 변환하는지**에 대한 내용이 나온다.

3d 좌표에서 2d 이미지 좌표로 바꾸는 것은 $ \R^3 \xrightarrow[]{E} \R^2 $이다.

이제 이미지 평면 위에 생긴 상을 실제 픽셀로 바꿀 것이다. 이를 위해 크게 2가지 과정이 필요하다.

**1. Offset**\
이미지 좌표와 픽셀 좌표의 원점이 맞지 않을 수 있다. 그래서 **주점** 을 더해 맞춰준다.

$(x,y,z) \to (f\frac xz+c_x,f\frac yz +c_y)$

여기서 ($c_x,c_y$)는 **주점(Principal Point)** 으로 광축이 이미지 평면과 만나는 지점의 좌표이다.

**2. From metric to pixel**\
공간좌표는 미터 단위, 이미지는 픽셀 단위이므로 미터 단위에서 픽셀 단위로 단위를 바꿔야 한다.

$(x,y,z) \to (fk\frac xz + c_x, fl\frac yz + c_y) = (\alpha \frac xz + c_x, \beta \frac yz + c_y)$

$k$와 $l$의 단위는 **pixel/m**이고 $f$의 단위는 m이다.
$\alpha, \beta$의 크기가 다를 수 있는 이유는 픽셀이 **Non-square** 할 수 있기 때문이다.

그래서 이 과정들을 지나

**$P = (x,y,z) \to P' = (\alpha \frac xz + c_x, \beta \frac yz + c_y)$**

가 된다.

하지만 이 식은 z로 나누기 때문에 **non-linear transformation**이다.

컴퓨터 비전에서는 행렬로써 식들을 다루기에 이는 매우 불편하다. \
그래서 이를 해결하기 위해 나온 방법이 **Homogeneous coordinates(동차좌표)** 이다.

![Homogeneous coordinates](images\005.png)

Homogeneous coordinates의 표기는 다음 사진과 같다. \
E는 유클리드 좌표고 H는 Homogeneous 좌표이다.

동차좌표의 마지막 좌표를 다른 좌표들에 나누면 그것이 유클리드 좌표가 된다.

![Homogeneous coordinates 2](images\006.png)
이 방법으로 전의 식을 다음과 같이 나타낼 수 있고

![Homogeneous coordinates 3](images\007.png)
이를 더 단순히 나타내면 다음과 같이 나타낼 수 있게 된다.

여기서 $K$를 internal camera parameter라 한다. 이는 이 파라미터들이 카메라의 내부에 의해 결정되기 때문이다.

## Extrinsic Transformation

실제 환경에서는 카메라가 월드 좌표계의 원점에 고정되어 있지 않을 수 있고 이를 위해 보정을 위한 **External Parameters**가 필요하다.

먼저 2D에서의 변환을 먼저 보자.

### 1. Translation (평행이동)
![2d translation](images\008.png)

$P' = TP$ 로 나타낼 수 있다.

### 2. Scaling (크기 변환)
![2d scaling](images\009.png)

$P' = SP$ 로 나타낼 수 있다.

### 3. Rotation (회전)
![2d rotation](images\010.png)

**rotation matrix**를 통해 $P' = RP$로 나타낼 수 있다.

rotation matrix $R(\theta)=\begin{bmatrix}\cos\theta&-\sin\theta\\\sin\theta&\cos\theta\end{bmatrix}$

2차원 Rotation은 회전각 $\theta$ 하나만 결정하면 되므로 **자유도가 1**이다.

참고로 Rotation Matrix는 다음 성질을 만족한다.

$
R^TR=I,\qquad \det(R)=1
$

이 성질은 3차원 회전에서도 중요하게 사용된다.

이제 **세 가지 변환을 하나로 합치면**

$P'=TRSP$

- \(S\): Scaling
- \(R\): Rotation
- \(T\): Translation

여기서 **행렬곱의 순서**가 매우 중요하다.\
다음 순서로 변환한다.
1. Scaling
2. Rotation
3. Translation

행렬곱은 교환법칙이 성립되지 않으므로 **반드시 순서에 맞게** 해야 한다.

![2d 변환](images\011.png)

위 사진과 같이 동차좌표로도 표현이 가능하다.

이제 **3D**를 보자.

### 1. translation
![3d 이동](images\012.png)

2d와 별 차이가 없다는 것을 알 수 있다.

### 2. Rotation
![3d 회전](images\013.png)

회전은 조금 복잡해 졌다. 2d와 달리 각 축에 대해 고정을 한 회전각도를 총 3개 고려해야 하기 때문이다. 

마찬가지로 행렬곱은 교환법칙이 성립하지 않기 때문에 반드시 순서에 맞게 계산을 해야 한다.

![3d 변환](images\014.png)

위 두 식을 합쳐 다음과 같이 표현 가능하다. 그리고 이 **R, T**를 **External Camera Parameter**라 한다.

## Camera Parameter M

이때까지 한 것을 바탕으로 정리를 하면 다음과 같다.

**World reference system**을 **External Parameter**로 **Camera reference system**으로 변형

이 변형된 Camera reference system을 **Internal Camera Parameter**로 **image reference system**으로 변형

이 과정을 거쳐서 3d 공간 좌표를 2d 이미지 평면의 좌표로 변환시킨다.

![camera parameter](images\015.png)
![camera parameter 2](images\016.png)
이 과정을 하나의 식으로 표현 하면 위 사진들과 같다.

$M$을 **Camera Parameter**라 하고 **Internal parameter, External parameter**를 요약한 것이다.

![camera parameter 3](images\017.png)

그리고 $M$을 저렇게 행마다 벡터로 나눠서 다음과 같이 유클리드 좌표로 간단히 나타낼 수도 있다.

이 표현은 계속해서 나오니 알아두는 것이 중요하다.

이 챕터의 내용은 이후의 챕터의 아주 중요한 근간이 되니 무조건 알고 가는것이 중요하다.