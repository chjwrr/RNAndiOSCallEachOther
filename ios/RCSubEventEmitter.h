//
//  RCSubEventEmitter.h
//  RNAndiOSCallEachOther
//
//  Created by Mac on 2017/5/5.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <React/RCTEventEmitter.h>

@interface RCSubEventEmitter : RCTEventEmitter <RCTBridgeModule>

-(void)Callback:(NSString*)code result:(NSString*) result;

@end
