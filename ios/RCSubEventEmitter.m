//
//  RCSubEventEmitter.m
//  RNAndiOSCallEachOther
//
//  Created by Mac on 2017/5/5.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "RCSubEventEmitter.h"
#import <UIKit/UIKit.h>

@implementation RCSubEventEmitter

- (NSArray<NSString *> *)supportedEvents
{
  return @[@"Callback", @"iseVolume", @"playCallback"];//有几个就写几个
}

-(void)Callback:(NSString*)code result:(NSString*) result {
  
  
  
  [self sendEventWithName:@"Callback"
                     body:@{
                            @"code": code,
                            @"result": result,
                            }];
  
  
}


@end
