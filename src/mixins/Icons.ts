/* tslint:disable:max-line-length no-trailing-whitespace */

/**
 * Custom SVG icons
 */

import { VueConstructor } from 'vue'
import Icon from 'vue-awesome/components/Icon.vue'

interface VueIcon extends VueConstructor {
  register: Function;
}

const icon = Icon as unknown as VueIcon

icon.register({
  fingerprint: {
    width: 513,
    height: 513,
    raw: `
      <path d="M466.253 108.495C436.351 66.1505 394.987 34.2135 346.634 16.1375C342.757 14.6885 338.434 16.6565 336.983 20.5355C335.533 24.4155 337.503 28.7365 341.382 30.1865C386.901 47.2035 425.844 77.2735 454 117.146C482.784 157.908 497.999 205.924 497.999 256.005C497.999 287.059 492.18 317.283 480.702 345.838C479.157 349.681 481.02 354.049 484.864 355.594C485.781 355.963 486.727 356.137 487.659 356.137C490.631 356.137 493.443 354.358 494.62 351.432C506.815 321.09 512.999 288.984 512.999 256.005C512.999 202.808 496.835 151.8 466.253 108.495Z" fill="#502EC2"/>
      <path d="M458.571 401.559C455.288 399.03 450.579 399.644 448.053 402.924C439.758 413.693 430.49 423.831 420.505 433.056C417.463 435.867 417.276 440.612 420.086 443.655C421.565 445.255 423.577 446.065 425.597 446.065C427.417 446.065 429.243 445.406 430.685 444.074C441.287 434.278 451.128 423.513 459.936 412.078C462.465 408.796 461.853 404.086 458.571 401.559Z" fill="#502EC2"/>
      <path d="M372.705 467.465C337.465 486.791 297.454 497.005 256.999 497.005C192.626 497.005 132.105 471.937 86.5868 426.418C83.6568 423.489 78.9088 423.489 75.9798 426.418C73.0508 429.347 73.0508 434.096 75.9798 437.024C124.332 485.376 188.619 512.005 256.999 512.005C299.968 512.005 342.473 501.151 379.918 480.618C383.55 478.626 384.879 474.068 382.888 470.436C380.895 466.803 376.339 465.473 372.705 467.465Z" fill="#502EC2"/>
      <path d="M15.9988 256.005C15.9988 191.631 41.0668 131.111 86.5858 85.5915C132.104 40.0725 192.625 15.0045 256.999 15.0045C261.142 15.0045 264.499 11.6465 264.499 7.50452C264.499 3.36252 261.142 0.0045166 256.999 0.0045166C188.619 0.0045166 124.331 26.6325 75.9788 74.9845C27.6268 123.337 0.998779 187.625 0.998779 256.005C0.998779 287.226 6.55778 317.732 17.5208 346.674C18.6568 349.673 21.5078 351.519 24.5358 351.519C25.4188 351.519 26.3168 351.362 27.1918 351.031C31.0648 349.564 33.0158 345.234 31.5478 341.361C21.2298 314.122 15.9988 285.404 15.9988 256.005Z" fill="#502EC2"/>
      <path d="M357.271 68.0425C326.635 51.6655 291.961 43.0085 256.999 43.0085C219.726 43.0085 183.044 52.7795 150.919 71.2635C119.763 89.1905 93.4338 114.917 74.7778 145.66C72.6298 149.201 73.7578 153.814 77.2988 155.962C78.5148 156.7 79.8568 157.051 81.1828 157.051C83.7168 157.051 86.1908 155.766 87.6018 153.441C104.948 124.855 129.429 100.935 158.4 84.2645C188.252 67.0885 222.348 58.0085 256.999 58.0085C289.503 58.0085 321.731 66.0525 350.199 81.2705C353.852 83.2235 358.397 81.8445 360.349 78.1915C362.303 74.5395 360.924 69.9945 357.271 68.0425Z" fill="#502EC2"/>
      <path d="M411.862 120.715C408.647 123.327 408.157 128.05 410.769 131.265C439.289 166.378 454.995 210.678 454.995 256.004C454.995 299.44 441.196 340.667 415.091 375.227C389.827 408.672 353.93 433.689 314.011 445.671C310.044 446.862 307.793 451.044 308.984 455.011C309.96 458.259 312.939 460.357 316.165 460.357C316.879 460.357 317.605 460.254 318.324 460.039C361.273 447.147 399.89 420.239 427.06 384.269C455.149 347.083 469.996 302.73 469.996 256.005C469.996 207.245 453.098 159.587 422.413 121.809C419.801 118.594 415.079 118.104 411.862 120.715Z" fill="#502EC2"/>
      <path d="M256.999 469.001C261.142 469.001 264.499 465.643 264.499 461.501C264.499 457.359 261.142 454.001 256.999 454.001C147.823 454.001 59.0028 365.181 59.0028 256.005C59.0028 244.911 59.9278 233.782 61.7528 222.927C62.4398 218.842 59.6848 214.974 55.5998 214.287C51.5158 213.602 47.6468 216.355 46.9598 220.44C44.9978 232.114 44.0028 244.08 44.0028 256.004C44.0028 373.451 139.553 469.001 256.999 469.001Z" fill="#502EC2"/>
    `
  },
  bip: {
    width: 336,
    height: 336,
    raw: `
      <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="336" height="336">
      <circle cx="168" cy="168" r="168" fill="white"/>
      </mask>
      <g mask="url(#mask0)">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M-59 -73H383C394.046 -73 403 -64.0457 403 -53V389C403 400.046 394.046 409 383 409H-59C-70.0457 409 -79 400.046 -79 389V-53C-79 -64.0457 -70.0457 -73 -59 -73ZM100.842 238.009C120.503 241.16 137.495 241.888 152.787 241.888C204.731 241.888 234.102 208.916 234.102 160.67C234.102 131.577 218.81 118.485 194.051 118.485C182.4 118.485 172.205 122.122 162.011 128.91L161.282 128.668C162.016 126.348 164.365 113.098 168.331 88.9171C168.794 86.0938 169.279 83.1214 169.786 80L123.32 85.9867L100.842 238.009Z" fill="#502EC2"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M185.798 177.883C185.82 177.639 185.843 177.396 185.865 177.156C186.083 174.774 186.284 172.592 186.284 170.61C186.284 159.458 181.186 155.579 172.933 155.579C168.079 155.579 162.011 158.73 157.641 161.882L151.33 204.794C155.214 205.522 158.37 205.764 161.525 205.764C176.332 205.764 182.885 196.066 185.798 177.883Z" fill="#502EC2"/>
      </g>
    `
  },
  send: {
    width: 512,
    height: 512,
    raw: `
      <path d="M168 40H368V56H168V40Z" fill="#5024C5"/>
      <path d="M136 40H152V56H136V40Z" fill="#5024C5"/>
      <path d="M488 72H216C213.878 72 211.843 72.8429 210.343 74.3431C208.843 75.8434 208 77.8783 208 80V264C199.516 263.99 191.382 260.616 185.383 254.617C179.384 248.618 176.01 240.484 176 232H192V216H160C151.516 215.99 143.382 212.616 137.383 206.617C131.384 200.618 128.01 192.484 128 184H192V168H112C103.516 167.99 95.3822 164.616 89.3831 158.617C83.384 152.618 80.0095 144.484 80 136H192V120H64C55.516 119.99 47.3822 116.616 41.3831 110.617C35.384 104.618 32.0095 96.484 32 88H192V72H24C21.8783 72 19.8434 72.8429 18.3431 74.3431C16.8429 75.8434 16 77.8783 16 80V88C16.014 100.726 21.0757 112.927 30.0744 121.926C39.0731 130.924 51.2739 135.986 64 136C64.014 148.726 69.0757 160.927 78.0744 169.926C87.0731 178.924 99.2739 183.986 112 184C112.014 196.726 117.076 208.927 126.074 217.926C135.073 226.924 147.274 231.986 160 232C160.014 244.726 165.076 256.927 174.074 265.926C183.073 274.924 195.274 279.986 208 280H280V264H236.461L323.313 183.829L346.753 204.193C348.209 205.458 350.072 206.154 352 206.154C353.928 206.154 355.791 205.458 357.247 204.193L380.687 183.829L467.539 264H424V280H488C490.122 280 492.157 279.157 493.657 277.657C495.157 276.157 496 274.122 496 272V80C496 77.8783 495.157 75.8434 493.657 74.3431C492.157 72.8429 490.122 72 488 72ZM224 253.728V97.548L311.161 173.272L224 253.728ZM352 187.557L237.407 88H466.593L352 187.557ZM480 97.548V253.728L392.839 173.272L480 97.548Z" fill="#5024C5"/>
      <path d="M392 224H408V416H392V224Z" fill="#5024C5"/>
      <path d="M360 404.687L340.687 424H312V440H344C345.051 440 346.091 439.793 347.062 439.391C348.032 438.989 348.914 438.4 349.657 437.657L373.657 413.657C374.4 412.914 374.989 412.032 375.391 411.062C375.793 410.091 376 409.051 376 408V248H360V404.687Z" fill="#5024C5"/>
      <path d="M285.657 405.657L341.657 349.657C342.4 348.914 342.989 348.032 343.391 347.062C343.793 346.091 344 345.051 344 344V232H328V340.687L276.687 392H232C230.949 392 229.909 392.207 228.938 392.609C227.968 393.011 227.086 393.6 226.343 394.343L180.687 440H152V432C152 429.878 151.157 427.843 149.657 426.343C148.157 424.843 146.122 424 144 424H112C109.878 424 107.843 424.843 106.343 426.343C104.843 427.843 104 429.878 104 432V464C104 466.122 104.843 468.157 106.343 469.657C107.843 471.157 109.878 472 112 472H144C146.122 472 148.157 471.157 149.657 469.657C151.157 468.157 152 466.122 152 464V456H184C185.051 456 186.091 455.793 187.062 455.391C188.032 454.989 188.914 454.4 189.657 453.657L235.313 408H280C281.051 408 282.091 407.793 283.062 407.391C284.032 406.989 284.914 406.4 285.657 405.657V405.657ZM136 456H120V440H136V456Z" fill="#5024C5"/>
      <path d="M392 432H408V448H392V432Z" fill="#5024C5"/>
      <path d="M280 424H296V440H280V424Z" fill="#5024C5"/>
      <path d="M176 344H144C141.878 344 139.843 344.843 138.343 346.343C136.843 347.843 136 349.878 136 352V384C136 386.122 136.843 388.157 138.343 389.657C139.843 391.157 141.878 392 144 392H176C178.122 392 180.157 391.157 181.657 389.657C183.157 388.157 184 386.122 184 384V376H264C265.051 376 266.091 375.793 267.062 375.391C268.032 374.989 268.914 374.4 269.657 373.657L309.657 333.657C310.4 332.914 310.989 332.032 311.391 331.062C311.793 330.091 312 329.051 312 328V248H296V324.687L260.687 360H184V352C184 349.878 183.157 347.843 181.657 346.343C180.157 344.843 178.122 344 176 344ZM168 376H152V360H168V376Z" fill="#5024C5"/>
    `
  },
  wave: {
    width: 1440,
    height: 320,
    raw: `
      <path fill="#502EC2" fill-opacity="1" d="M0,64L120,85.3C240,107,480,149,720,154.7C960,160,1200,128,1320,112L1440,96L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path>
    `
  },
  arrowLeft: {
    width: 57,
    height: 57,
    raw: `
      <g><path d="m37.176 50.505c-1.202 0-2.332-.468-3.182-1.318l-17.659-17.659c-.852-.852-1.32-1.982-1.32-3.184s.468-2.332 1.318-3.182l17.661-17.66c.85-.85 1.979-1.318 3.182-1.318s2.332.468 3.182 1.318c.851.85 1.318 1.98 1.318 3.183s-.469 2.333-1.318 3.182l-14.479 14.478 14.479 14.478c.85.85 1.318 1.979 1.318 3.182s-.469 2.332-1.318 3.182c-.85.85-1.981 1.318-3.182 1.318zm-19.458-20.423.031.03 17.66 17.66c.945.945 2.59.945 3.535 0 .473-.473.732-1.1.732-1.768s-.26-1.295-.732-1.768l-15.893-15.891 15.893-15.892c.473-.472.732-1.1.732-1.768s-.26-1.296-.732-1.769c-.945-.944-2.59-.944-3.535 0l-17.661 17.66c-.472.472-.732 1.1-.732 1.767-.001.655.248 1.27.702 1.739z"/></g>
    `
  },
  arrowRight: {
    width: 57,
    height: 57,
    raw: `
      <g><path d="m19.515 50.505c-1.202 0-2.332-.468-3.182-1.318s-1.318-1.979-1.318-3.182.469-2.332 1.318-3.182l14.479-14.479-14.479-14.477c-.85-.849-1.318-1.979-1.318-3.182s.468-2.332 1.318-3.183c.85-.85 1.979-1.317 3.182-1.317s2.332.468 3.182 1.317l17.661 17.66c.851.85 1.318 1.979 1.318 3.182s-.468 2.332-1.318 3.182l-17.661 17.66c-.85.851-1.98 1.319-3.182 1.319zm0-42.319c-.668 0-1.295.26-1.768.731-.473.473-.732 1.101-.732 1.769s.26 1.296.732 1.768l15.893 15.891-15.893 15.892c-.473.473-.732 1.1-.732 1.768s.26 1.295.732 1.768c.945.945 2.59.945 3.535 0l17.705-17.704c.443-.466.688-1.076.688-1.724 0-.668-.26-1.295-.732-1.767l-17.661-17.661c-.472-.472-1.099-.731-1.767-.731z"/></g>
    `
  },
  message: {
    width: 60,
    height: 60,
    raw: `
      <g>
      <path d="M16,24.5c-2.206,0-4,1.794-4,4s1.794,4,4,4s4-1.794,4-4S18.206,24.5,16,24.5z M16,30.5c-1.103,0-2-0.897-2-2s0.897-2,2-2
      s2,0.897,2,2S17.103,30.5,16,30.5z"/>
      <path d="M30,24.5c-2.206,0-4,1.794-4,4s1.794,4,4,4s4-1.794,4-4S32.206,24.5,30,24.5z M30,30.5c-1.103,0-2-0.897-2-2s0.897-2,2-2
      s2,0.897,2,2S31.103,30.5,30,30.5z"/>
      <path d="M44,24.5c-2.206,0-4,1.794-4,4s1.794,4,4,4s4-1.794,4-4S46.206,24.5,44,24.5z M44,30.5c-1.103,0-2-0.897-2-2s0.897-2,2-2
      s2,0.897,2,2S45.103,30.5,44,30.5z"/>
      <path d="M30,1.5c-16.542,0-30,12.112-30,27c0,5.204,1.646,10.245,4.768,14.604c-0.591,6.537-2.175,11.39-4.475,13.689
      c-0.304,0.304-0.38,0.769-0.188,1.153C0.275,58.289,0.625,58.5,1,58.5c0.046,0,0.092-0.003,0.139-0.01
      c0.405-0.057,9.813-1.411,16.618-5.339C21.621,54.71,25.737,55.5,30,55.5c16.542,0,30-12.112,30-27S46.542,1.5,30,1.5z M30,53.5
      c-3.487,0-6.866-0.569-10.075-1.681c4.075-2.546,4.084-2.726,4.081-3.316c-0.002-0.349-0.191-0.682-0.491-0.861
      c-0.455-0.273-1.041-0.143-1.338,0.29c-0.548,0.435-2.904,1.945-5.014,3.248c0,0-0.001,0-0.001,0
      c-4.466,2.697-10.476,4.202-13.81,4.881c2.202-3.67,3.091-8.985,3.44-13.16c0.02-0.241-0.048-0.481-0.191-0.677
      C3.591,38.143,2,33.396,2,28.5c0-13.785,12.561-25,28-25s28,11.215,28,25S45.439,53.5,30,53.5z"/>
      </g>
    `
  }
})
