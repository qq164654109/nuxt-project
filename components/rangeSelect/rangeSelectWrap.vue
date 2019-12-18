<template>
  <div class="range-select-wrap no-select clearfix full-height">
    <slot></slot>
    <div ref="delBtn" v-show="delVisible" class="del-btn" :class="{'active': delActive}">
      删除
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      openSelect: {
        type: Boolean,
        default: true
      },
      rangeStyle: {
        type: Object,
        default() {
          return {
            backgroundColor: 'rgba(51, 153, 255, 0.25)',
            borderColor: 'rgba(51, 153, 255, 1)'
          }
        }
      }
    },
    data() {
      this._domSelectRange = null;
      this._selectComps = [];
      return {
        delVisible: false,
        delActive: false
      }
    },
    mounted() {
      if (this.openSelect) {
        this.addRangeSelectListener();
      }
    },
    methods: {
      addRangeSelectListener() {
        this._handleWrapMousedown = mdEvt => {
          mdEvt.preventDefault();

          this.clearSelectRangeDom();
          this.clearSelectItems();

          this._domSelectRange = this.createSelectRangeDom();
          this._domSelectRange.style.left = mdEvt.clientX + 'px';
          this._domSelectRange.style.top = mdEvt.clientY + 'px';
          this.$el.appendChild(this._domSelectRange);

          let originX = mdEvt.clientX;
          let originY = mdEvt.clientY;
        
          this._handleWrapMousemove = mmEvt => {
            mmEvt.preventDefault();

            let disX = mmEvt.clientX - originX;
            let disY = mmEvt.clientY - originY;
            if (disX < 0) {
              this._domSelectRange.style.left = originX + disX  + 'px';
            } else {
              this._domSelectRange.style.left = originX + 'px';
            }
            if (disY < 0) {
              this._domSelectRange.style.top = originY + disY  + 'px';
            } else {
              this._domSelectRange.style.top = originY + 'px';
            }

            this._domSelectRange.style.width = Math.abs(disX) + 'px';
            this._domSelectRange.style.height = Math.abs(disY) + 'px';
          };

          this._handleWrapMouseup = muEvt => {
            muEvt.preventDefault();
            
            this._selectComps = this.getSelectItems();
            
            this.clearSelectRangeDom();

            document.removeEventListener('mousemove', this._handleWrapMousemove);
            document.removeEventListener('mouseup', this._handleWrapMouseup);

            if (this._selectComps.length > 0) {
              this.$el.removeEventListener('mousedown', this._handleWrapMousedown);

              this.addControlSelectListener();
            }
          };

          document.addEventListener('mousemove', this._handleWrapMousemove);
          document.addEventListener('mouseup', this._handleWrapMouseup);
        };

        this.$el.addEventListener('mousedown', this._handleWrapMousedown);
      },
      addControlSelectListener() {
        let wrapRect = this.$el.getBoundingClientRect();
        this._handleDocMousedown = docMdEvt => {
            docMdEvt.preventDefault();

            if (this._selectComps.some(comp => comp.$el.contains(docMdEvt.target))) {
              this.delVisible = true;
              let originCompStyles = [];
              let mouseToWrapX = docMdEvt.clientX - wrapRect.left;
              let mouseToWrapY = docMdEvt.clientY - wrapRect.top;
              
              let originOffset = this._selectComps.map(comp => {
                let el = comp.$el;
                return {
                  left: el.offsetLeft,
                  top: el.offsetTop,
                  translateX: mouseToWrapX - el.offsetLeft - el.offsetWidth / 2,
                  translateY: mouseToWrapY - el.offsetTop - el.offsetHeight / 2
                }
              });

              this._selectComps.forEach((comp, index) => {
                let el = comp.$el;
                originCompStyles.push({
                  position: el.style.position,
                  left: el.style.left,
                  top: el.style.top,
                  transform: el.style.transform,
                  zIndex: el.style.zIndex,
                });
                el.style.left = originOffset[index].left + 'px';
                el.style.top = originOffset[index].top + 'px';
                el.style.position = 'absolute';
                el.style.transform = 'translate('+ originOffset[index].translateX + 'px, '+ originOffset[index].translateY + 'px) rotate('+ -7 * index +'deg)';
                el.style.zIndex = 22;
              });

              this._handleDocMousemove = docMmEvt => {
                docMmEvt.preventDefault();
                
                this._selectComps.forEach((comp, index) => {
                  let el = comp.$el;
                  el.style.left = docMmEvt.clientX - wrapRect.left - originOffset[index].translateX - el.offsetWidth / 2 + 'px';
                  el.style.top = docMmEvt.clientY - wrapRect.top - originOffset[index].translateY - el.offsetHeight / 2 + 'px';
                });
                this.delActive = this.$refs.delBtn.contains(docMmEvt.target);
              };

              this._handleDocMouseup = docMuEvt => {
                docMuEvt.preventDefault();

                this.delActive = false;
                this.delVisible = false;

                if (this.$refs.delBtn.contains(docMuEvt.target)) {
                  this._selectComps.forEach(comp => {
                    comp.$destroy(true);
                    this.$el.removeChild(comp.$el);
                  });
                } else {
                  this._selectComps.forEach((comp, index) => {
                    let el = comp.$el;
                    let originStyle = originCompStyles[index];
                    Object.keys(originStyle).forEach(attr => {
                      el.style[attr] = originStyle[attr];
                    });
                    comp.selected = false;
                  });
                }

                this._selectComps = [];
                
                document.removeEventListener('mousedown', this._handleDocMousedown);
                document.removeEventListener('mousemove', this._handleDocMousemove);
                document.removeEventListener('mouseup', this._handleDocMouseup);

                this.$el.addEventListener('mousedown', this._handleWrapMousedown);
              };

              document.addEventListener('mousemove', this._handleDocMousemove);
              document.addEventListener('mouseup', this._handleDocMouseup);
            } else {
              this.clearSelectItems();

              document.removeEventListener('mousedown', this._handleDocMousedown);
              this.$el.addEventListener('mousedown', this._handleWrapMousedown);
            }
          }

          document.addEventListener('mousedown', this._handleDocMousedown);
      },
      createSelectRangeDom() {
        let domSelectRange = document.createElement('div');
        domSelectRange.style.position = 'fixed';
        domSelectRange.style.width = '1px';
        domSelectRange.style.height = '1px';
        domSelectRange.style.borderWidth = '1px';
        domSelectRange.style.borderStyle = 'solid';
        domSelectRange.style.borderRadius = '4px';
        domSelectRange.style.borderColor = this.rangeStyle.borderColor;
        domSelectRange.style.backgroundColor = this.rangeStyle.backgroundColor;
        return domSelectRange;
      },
      clearSelectRangeDom() {
        this._domSelectRange && this.$el.removeChild(this._domSelectRange);
        this._domSelectRange = null;
      },
      getSelectItems() {
        let childComps = this.$children;

        let childBoundsList = childComps.map(comp => {
          let ol = comp.$el.offsetLeft, 
              ot = comp.$el.offsetTop,
              oW = comp.$el.offsetWidth,
              oH = comp.$el.offsetHeight;
          return {
            xmin: ol,
            ymin: ot,
            xmax: ol + oW,
            ymax: ot + oH
          }
        });

        let wrapRect = this.$el.getBoundingClientRect();

        let ol = this._domSelectRange.offsetLeft - wrapRect.left, 
            ot = this._domSelectRange.offsetTop - wrapRect.top,
            oW = this._domSelectRange.offsetWidth,
            oH = this._domSelectRange.offsetHeight;
        let selectBounds = {
          xmin: ol,
          ymin: ot,
          xmax: ol + oW,
          ymax: ot + oH
        };
        
        let selectComps = [];
        
        childBoundsList.forEach((childBounds, index) => {
          childComps[index].selected = false;
          if (this.isIntersect(childBounds, selectBounds) || this.isIntersect(selectBounds, childBounds)) {
            childComps[index].selected = true;
            selectComps.push(childComps[index])
          }
        });

        return selectComps;
      },
      clearSelectItems() {
        this._selectComps.forEach(comp => {
          comp.selected = false;
        })
        this._selectComps = [];
      },
      isIntersect(bounds1, bounds2) {
        let ltPos = [bounds1.xmin, bounds1.ymin];
        let lbPos = [bounds1.xmin, bounds1.ymax];
        let rtPos = [bounds1.xmax, bounds1.ymin];
        let rbPos = [bounds1.xmax, bounds1.ymax];

        return this.posInBounds(ltPos, bounds2) || this.posInBounds(lbPos, bounds2) || this.posInBounds(rtPos, bounds2) || this.posInBounds(rbPos, bounds2);
      },
      posInBounds(pos, bounds) {
        return pos[0] >= bounds.xmin && pos[1] >= bounds.ymin && pos[0] <= bounds.xmax && pos[1] <= bounds.ymax;
      },
      isContain(bounds1, bounds2) {
        return bounds1.xmin <= bounds2.xmin && bounds1.ymin <= bounds2.ymin && bounds1.xmax >= bounds2.xmax && bounds1.ymax > bounds2.ymax; 
      },
      reset() {
        this._handleWrapMousedown && this.$el.removeEventListener('mousedown', this._handleWrapMousedown);
        this._handleWrapMousemove && document.removeEventListener('mousemove', this._handleWrapMousemove);
        this._handleWrapMouseup && document.removeEventListener('mouseup', this._handleWrapMouseup);
        this._handleDocMousedown && document.removeEventListener('mousedown', this._handleDocMousedown);
        this._handleDocMousemove && document.removeEventListener('mousemove', this._handleDocMousemove);
        this._handleDocMouseup && document.removeEventListener('mouseup', this._handleDocMouseup);

        this.clearSelectRangeDom();
        this.clearSelectItems();
      }
    },
    watch: {
      openSelect(val) {
        this.reset();
        if (val) {
          this.addRangeSelectListener();
        }
      }
    },
    beforeDestroy() {
      this.reset();
    }
  }
</script>

<style lang="scss" scoped>
.range-select-wrap {
  position: relative;
  padding: 20px;
  .del-btn {
    position: absolute;
    bottom: 70px;
    right: 70px;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #FFF;
    background-color: #F56C6C;
    border-radius: 50%;
    z-index: 100;
    &.active {
      animation: shine 1s infinite;
    }
  }
}
@keyframes shine {
  0% {
    box-shadow: 0px 0px 8px rgba(217, 255, 0, 0.2);
  }
  25% {
    box-shadow: 0px 0px 8px rgba(217, 255, 0, 0.8);
  }
  50% {
    box-shadow: 0px 0px 8px rgba(217, 255, 0, 0.2);
  }
  75% {
    box-shadow: 0px 0px 8px rgba(217, 255, 0, 0.8);
  }
  100% {
    box-shadow: 0px 0px 8px rgba(217, 255, 0, 0.2);
  }
}
</style>

