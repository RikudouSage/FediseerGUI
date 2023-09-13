import {AfterViewInit, Component, OnInit} from '@angular/core';
import {TitleService} from "../../../services/title.service";
import {AuthenticationManagerService} from "../../../services/authentication-manager.service";
import {Instance} from "../../../user/instance";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-glossary',
  templateUrl: './glossary.component.html',
  styleUrls: ['./glossary.component.scss']
})
export class GlossaryComponent implements OnInit, AfterViewInit {
  public currentInstance: Instance = this.authManager.currentInstanceSnapshot;

  private fragment: string | null = null;

  constructor(
    private readonly titleService: TitleService,
    private readonly authManager: AuthenticationManagerService,
    private readonly route: ActivatedRoute,
  ) {
  }

  public async ngOnInit(): Promise<void> {
    this.titleService.title = 'Glossary';
    this.route.fragment.subscribe(fragment => { this.fragment = fragment; });
  }

  public async ngAfterViewInit(): Promise<void> {
    if (!this.fragment) {
      return;
    }

    const element = document.querySelector(`#${this.fragment}`);
    if (element === null) {
      return;
    }
    element.scrollIntoView();
  }
}
